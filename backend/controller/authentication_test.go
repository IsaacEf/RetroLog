package controller

import (
	"bytes"
	"github.com/gin-gonic/gin"
	"net/http/httptest"
	"testing"
)

func TestRegister(t *testing.T) {
	gin.SetMode(gin.TestMode)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	testUser := []byte(`{
    "Email:test@testing.com",
    "Password:testing123"
  }`)

	r := httptest.NewRequest("POST", "http://localhost:8000/auth/register", bytes.NewBuffer(testUser))

	Register(c).serveHttp(w, r)

	if w.Code != 201 {
		panic("Register Test failed")
	}
}

// https://stackoverflow.com/questions/59186562/unit-testing-with-gin-gonic
// https://www.twilio.com/blog/build-restful-api-using-golang-and-gin
// https://www.digitalocean.com/community/tutorials/how-to-write-unit-tests-in-go-using-go-test-and-the-testing-package
// https://semaphoreci.com/community/tutorials/test-driven-development-of-go-web-applications-with-gin
