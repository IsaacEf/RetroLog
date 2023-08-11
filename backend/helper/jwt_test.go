// test for functions in jwt

package helper

import (
	"backend/model"
	"fmt"
	"os"
	"testing"
)

func TestGenerateJWT(t *testing.T) {
	// Set up your test environment, e.g., by setting the TOKEN_TTL environment variable
	os.Setenv("TOKEN_TTL", "3600") // Set a token TTL of 1 hour for testing

	// Clean up the environment variables after the test
	defer os.Unsetenv("TOKEN_TTL")

	var user model.User
	user.ID = 123

	token, err := GenerateJWT(user)
	if err != nil {
		t.Fatalf("GenerateJWT returned an error: %v", err)
	}

	// prints for viewing (can't test for specific value for test)
	fmt.Print(token)

	if token == "" {
		t.Fatalf("Did not generate a toekn")
	}
}
