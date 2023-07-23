package main

import (
	"backend/controller"
	"backend/database"
	"backend/middleware"
	"backend/model"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"fmt"
	"log"
	"net/http"
)

func main() {
	loadEnv()
	loadDatabase()
	serveApplication()
}

func loadEnv() {
	err := godotenv.Load(".env.local")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func loadDatabase() {
	database.Connect()
	database.Database.AutoMigrate(&model.User{})
	database.Database.AutoMigrate(&model.Backwork{})
	database.Database.AutoMigrate(&model.Course{})
	database.Database.AutoMigrate(&model.Professor{})
}

// run server
func serveApplication() {
	router := gin.Default()

	router.LoadHTMLGlob("../retro-log/build/index.html")  // point to your index.html
	router.Static("/static", "../retro-log/build/static") // point to the static directory

	// Setup route
	router.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	publicRoutes := router.Group("/auth")
	publicRoutes.POST("/register", controller.Register)
	publicRoutes.POST("/login", controller.Login)

	protectedRoutes := router.Group("/api")
	protectedRoutes.Use(middleware.JWTAuthMiddleware())
	protectedRoutes.POST("/entry", controller.AddBackwork)
	protectedRoutes.GET("/entry", controller.GetAllBackworks)
	protectedRoutes.GET("/professors", controller.GetAllProfessors)

	router.Run(":8000")
	fmt.Println("Server running on port 8000")
}
