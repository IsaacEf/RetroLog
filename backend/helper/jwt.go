package helper

import (
	"backend/model"
	"github.com/golang-jwt/jwt/v4"
	"os"
	"strconv"
	"time"
)

var privateKey = []byte(os.Getenv("JWT_PRIVATE_KEY"))

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
