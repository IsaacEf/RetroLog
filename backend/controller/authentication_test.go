package controller

import (
	"backend/model"

	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestRegister(t *testing.T) {
	gin.SetMode(gin.TestMode)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	c.Request = &http.Request{
		Header: make(http.Header),
	}

	c.Request.Method = "POST"
	c.Request.Header.Set("Content-Type", "application/json")

	jsonbytes, err := json.Marshal(model.AuthenticationInput{
		Email:    "testemail@gmail.com",
		Password: "password123",
	})

	if err != nil {
		panic(err)
	}

	// the request body must be an io.ReadCloser
	// the bytes buffer though doesn't implement io.Closer,
	// so you wrap it in a no-op closer
	c.Request.Body = io.NopCloser(bytes.NewBuffer(jsonbytes))

	_, err2 := RegisterValidateInput(c)

	if err2 != nil {
		t.Errorf("error: %q", err.Error())
	}

	got := w.Code
	want := 200

	if got != want {
		t.Errorf("got %d want %d", got, want)
		t.Errorf("body:%q", w.Body)
	}
}

// https://stackoverflow.com/questions/59186562/unit-testing-with-gin-gonic
// https://www.twilio.com/blog/build-restful-api-using-golang-and-gin
// https://www.digitalocean.com/community/tutorials/how-to-write-unit-tests-in-go-using-go-test-and-the-testing-package
// https://semaphoreci.com/community/tutorials/test-driven-development-of-go-web-applications-with-gin
