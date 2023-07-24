package controller

import (
	"backend/helper"
	"backend/model"
	"backend/storage"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"net/http"
)

func AddBackwork(context *gin.Context) {
	var input model.BackworkInput

	err := context.ShouldBindQuery(&input)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := helper.CurrentUser(context)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println(input)

	var backwork model.Backwork
	backwork.UserID = user.ID
	backwork.ProfessorID = input.ProfessorID
	backwork.CourseID = input.CourseID
	backwork.FileName = input.Filename
	backwork.Verified = false
	backwork.RelevanceScore = 0
	backwork.UUID = uuid.New().String()

	formFile, err := context.FormFile("file")
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	file, err := formFile.Open()
	backwork.FileURL = storage.UploadBackwork(backwork.UUID, file)

	savedBackwork, err := backwork.Save()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"data": savedBackwork})
}

func GetAllBackworks(context *gin.Context) {
	user, err := helper.CurrentUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": user})
}
