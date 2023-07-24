package controller

import (
	"backend/database"
	"backend/helper"
	"backend/model"
	"backend/storage"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"net/http"
)

func AddBackwork(context *gin.Context) {
	var input model.BackworkUpload

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
	var input model.BackworksQuery
	err := context.ShouldBindJSON(&input)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := database.Database
	var backworks []model.Backwork

	// The CourseID field is required, so we can add it to the initial query.
	db = db.Where("course_id = ?", input.CourseID)

	// The ProfessorID field is optional, so we add it to the query only if it is present.
	if input.ProfessorID != 0 {
		db = db.Where("professor_id = ?", input.ProfessorID)
	}

	// The Verified field is optional, so we add it to the query only if it is present.
	if input.Verified {
		db = db.Where("verified = ?", input.Verified)
	}

	// Execute the query and return the results.
	if err := db.Find(&backworks).Error; err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"backworks": backworks})
}

func GetBackwork(context *gin.Context) {
	var input model.BackworkQuery
	err := context.ShouldBindJSON(&input)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var backwork model.Backwork
	if err := database.Database.Where("ID = ?", input.ID).Find(&backwork).Error; err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"backwork": backwork})
}
