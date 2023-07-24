package controller

import (
	// "backend/database"
	"backend/helper"
	"backend/model"

	"github.com/badoux/checkmail"
	"github.com/gin-gonic/gin"

	"net/http"
)

// Testable piece of Registration Validation logic
func RegisterValidateInput(context *gin.Context) (model.User, error) {
	var input = model.AuthenticationInput{}

	// validates JSON request
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "failed to parse json"})
		return model.User{}, err
	}

	// validate email
	if err := checkmail.ValidateFormat(input.Email); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "email format invalid"})
		return model.User{}, err
	}

	// create new user
	validatedUser := model.User{
		Email:    input.Email,
		Password: input.Password,
	}

	return validatedUser, nil
}

func Register(context *gin.Context) {
	// validate user input before saving to database
	user, err := RegisterValidateInput(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// // hash user password
	// err = user.BeforeSave(database.Database)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	// save user in DB
	savedUser, err := user.Save()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// sends back details of saved user as response
	context.JSON(http.StatusCreated, gin.H{"user": savedUser})
}

func Login(context *gin.Context) {
	var input model.AuthenticationInput

	// write JSON to input struct
	if err := context.ShouldBindJSON(&input); err != nil {
		// return error if invalid
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// find user in db
	user, err := model.FindUserByEmail(input.Email)

	if err != nil {
		// error if they don't exist
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// confirm that the Password provided is correct
	err = user.ValidatePassword(input.Password)

	if err != nil {
		// error if its not
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	jwt, err := helper.GenerateJWT(user)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"jwt": jwt})
}
