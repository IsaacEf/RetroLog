package model

import (
	"gorm.io/gorm"
)

type Professor struct {
	gorm.Model
	Name      string `gorm:"type:varchar(255);not null;index"`
	Backworks []Backwork
}
