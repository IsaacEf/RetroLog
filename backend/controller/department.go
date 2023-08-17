package controller

import (
	"backend/database"
	"backend/model"
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetAllProfessors(context *gin.Context) {
	input := model.GetAllProfessorsInput{}

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "failed to parse json"})
		log.Error(err)
		return
	}

	var profs []model.Professor
	fmt.Println("department query param: ", input.Department)
	err := database.Database.Where("department=?", input.Department).Find(&profs).Error

	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": "database query failed"})
		log.Error(err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"professors": profs})
}

func GetAllCourses(context *gin.Context) {
	input := model.GetAllCoursesInput{}

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "failed to parse json"})
		log.Error(err)
		return
	}

	var courses []model.Course
	err := database.Database.Where("department = ?", input.Department).Find(&courses).Error

	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": "database query failed"})
		log.Error(err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"courses": courses})
}

func GetCourse(context *gin.Context) {
	input := model.Course{}

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "failed to parse json"})
		log.Error(err)
		return
	}

	err := model.FindCourse(&input)
	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": "database query failed"})
		log.Error(err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"course": input})
}
