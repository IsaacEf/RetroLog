package model

import (
	"gorm.io/gorm"
)

type Professor struct {
	gorm.Model
	Name       string     `gorm:"type:varchar(255);not null;index" json:"name"`
	Department string     `gorm:"type:varchar(4);not null; index" json:"dept"`
	Backworks  []Backwork `json:"backworks,omitempty"`
}
