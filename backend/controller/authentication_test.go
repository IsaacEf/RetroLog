func TestRegister(t *testing.T) {
	httpposturl := "http://localhost:8000/auth/register"
	testUser := []byte(`{
    "Email:"    "test@testing.com",
    "Password:" "testing123"
  }`)
	request, _ := http.NewRequest("POST", httpposturl, bytes.NewBuffer(testUser))

	request.Header.Set("Content-Type", "application/json; charset=UTF-8")

	response := httptest.NewRecorder()
	server.ServeHTTP(response, request)
	assert.Equal(t, response.Code, 201)
}

// https://stackoverflow.com/questions/59186562/unit-testing-with-gin-gonic
// https://www.twilio.com/blog/build-restful-api-using-golang-and-gin
// https://www.digitalocean.com/community/tutorials/how-to-write-unit-tests-in-go-using-go-test-and-the-testing-package
// https://semaphoreci.com/community/tutorials/test-driven-development-of-go-web-applications-with-gin
