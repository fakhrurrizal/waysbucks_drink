package models

import "time"

type Product struct {
	ID          int    `json:"id" `
	Nameproduct string `json:"nameproduct" form:"nameproduct" gorm:"type: varchar(255)"`
	Price       int    `json:"price" form:"price" gorm:"type: int"`
	Image       string `json:"image" form:"image" gorm:"type: varchar(255)"`
	CreateAt time.Time `json:"-"`
	UpdateAt time.Time `json:"-"`
}

type ProductResponse struct {
	ID          int    `json:"id"`
	Nameproduct string `json:"nameproduct"`
	Price       int    `json:"price"`
	Image       string `json:"image"`
}

type ProductUserResponse struct {
	ID          int    `json:"id"`
	Nameproduct string `json:"nameproduct"`
	Price       int    `json:"price"`
	Image       string `json:"image"`
}

func (ProductResponse) TableName() string {
	return "products"
}

func (ProductUserResponse) TableName() string {
	return "products"
}
