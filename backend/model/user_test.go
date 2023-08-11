// user_test.go
package model

import (
	"testing"

	"golang.org/x/crypto/bcrypt"
)

func TestValidatePassword(t *testing.T) {
	// Create a user with a hashed password
	user := User{
		Password: HashPassword("mysecretpassword"), // Hash the password
	}

	// Test correct password
	err := user.ValidatePassword("mysecretpassword")
	if err != nil {
		t.Errorf("Expected no error for correct password, but got: %v", err)
	}

	// Test incorrect password
	err = user.ValidatePassword("wrongpassword")
	if err == nil {
		t.Error("Expected an error for incorrect password, but got none")
	} else if err != bcrypt.ErrMismatchedHashAndPassword {
		t.Errorf("Expected bcrypt.ErrMismatchedHashAndPassword, but got: %v", err)
	}
}

func HashPassword(password string) string {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err) // Handle error appropriately in a real application
	}
	return string(hashedPassword)
}
