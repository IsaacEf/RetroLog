package helper

import (
	"backend/model"

	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

var privateKey = []byte(os.Getenv("JWT_PRIVATE_KEY"))

// ensures that the incoming request contains a valid token in the request header.
// This function will be used by the middleware to ensure that only authenticated
// requests are allowed past the middleware.
func ValidateJWT(context *gin.Context) error {
	token, err := getToken(context)

	if err != nil {
		return err
	}

	_, ok := token.Claims.(jwt.MapClaims)

	if ok && token.Valid {
		return nil
	}

	return errors.New("invalid token provided")
}

// gets the userid from the JWT
func CurrentUser(context *gin.Context) (model.User, error) {
	// make sure the JWT is valid
	err := ValidateJWT(context)
	if err != nil {
		return model.User{}, err
	}

	// parse out the information contained in the token
	token, _ := getToken(context)
	claims, _ := token.Claims.(jwt.MapClaims)
	userId := uint(claims["id"].(float64))

	// locate the user based on userId
	user, err := model.FindUserById(userId)

	if err != nil {
		return model.User{}, err
	}

	return user, nil
}

func getToken(context *gin.Context) (*jwt.Token, error) {
	// grab the actual token string from the HTTP request
	tokenString := getTokenFromRequest(context)

	// parse the JWT using a private key
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return privateKey, nil
	})
	return token, err
}

func getTokenFromRequest(context *gin.Context) string {
	// grab the "Authorization" hearder from HTTP request
	bearerToken := context.Request.Header.Get("Authorization")

	// parse out the token
	splitToken := strings.Split(bearerToken, " ")
	if len(splitToken) == 2 {
		return splitToken[1]
	}

	return ""
}

// This function takes a user model and generates a JWT containing
// the user’s id (id), the time at which the token was issued (iat),
// and the expiry date of the token (eat). Using the JWT_PRIVATE_KEY
// environment variable, a signed JWT is returned as a string.

func GenerateJWT(user model.User) (string, error) {
	tokenTTL, _ := strconv.Atoi(os.Getenv("TOKEN_TTL"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  user.ID,
		"iat": time.Now().Unix(),
		"eat": time.Now().Add(time.Second * time.Duration(tokenTTL)).Unix(),
	})
	return token.SignedString(privateKey)
}
