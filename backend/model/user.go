package model

import (
	"errors"
	"html"
	"strings"

	"backend/database"

	"gorm.io/gorm"

	"golang.org/x/crypto/bcrypt"
)

// User Struct, Just contains Email and Passwordf fields
type User struct {
	gorm.Model
	Email    string `gorm:"type:varchar(100);unique_index" json:"email"`
	Password string `gorm:"size:100;not null"              json:"-"`
}

// check that the password hash is correct
func (user *User) ValidatePassword(password string) error {
	return bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
}

func (user *User) BeforeSave(*gorm.DB) error {
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(passwordHash)
	user.Email = html.EscapeString(strings.TrimSpace(user.Email))
	return nil
}

// Adds a new user to the database
func (user *User) Save() (*User, error) {
	err := database.Database.Create(&user).Error

	if err != nil {
		return &User{}, err
	}

	return user, nil
}

// search database for user based on email
func FindUserByEmail(email string) (User, error) {
	var user User
	err := database.Database.Where("email=?", email).Find(&user).Error
	if err != nil {
		return User{}, err
	}
	return user, nil
}
