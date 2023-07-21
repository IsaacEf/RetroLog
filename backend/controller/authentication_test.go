package controller

import (
	"github.com/gin-gonic/gin"
	"net/http/httptest"
	"testing"
)

func TestRegister(t *testing.T) {
	gin.SetMode(gin.TestMode)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	// testUser := []byte(`{
	//    "Email:test@testing.com",
	//    "Password:testing123"
	//  }`)
	c.Params = []gin.Param{
		gin.Param{Key: "email", Value: "test@testing.com"},
		gin.Param{Key: "password", Value: "testing123"}}

	//r := httptest.NewRequest("POST", "http://localhost:8000/auth/register", bytes.NewBuffer(testUser))

	Register(c)

	got := w.Code
	want := 201

	if got != want {
		t.Errorf("got %d want %d", got, want)
		t.Errorf("body:%q", w.Body)
	}
}

// https://stackoverflow.com/questions/59186562/unit-testing-with-gin-gonic
// https://www.twilio.com/blog/build-restful-api-using-golang-and-gin
// https://www.digitalocean.com/community/tutorials/how-to-write-unit-tests-in-go-using-go-test-and-the-testing-package
// https://semaphoreci.com/community/tutorials/test-driven-development-of-go-web-applications-with-gin
