package controller

import (
	"backend/database"
	"backend/model"

	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllProfessors(context *gin.Context) {
	input := model.GetAllProfessorsInput{}

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "failed to parse json"})
	}

	var profs []model.Professor
	err := database.Database.Where("department = ?", "CSCI").Find(&profs)

	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": "database query failed"})
	}

	context.JSON(http.StatusOK, gin.H{"professors": profs})
}
