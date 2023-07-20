package controller

import (
	"backend/helper"
	"backend/model"
	"github.com/badoux/checkmail"
	"github.com/gin-gonic/gin"

	"net/http"
)

func Register(context *gin.Context) {
	var input = model.AuthenticationInput{}

	// validates JSON request
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate email
	if err := checkmail.ValidateFormat(input.Email); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create new user
	user := model.User{
		Email:    input.Email,
		Password: input.Password,
	}

	// hash user password
	err := user.BeforeSave()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	// save user in DB
	savedUser, err := user.Save()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
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
