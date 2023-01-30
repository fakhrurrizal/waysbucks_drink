package productdto

type CreateProduct struct {
	Nameproduct string `json:"nameproduct" form:"nameproduct" gorm:"type : varchar(255)" validate:"required"`
	Price       int    `json:"price" form:"price" gorm:"type : int" validate:"required"`
	Image       string `json:"image" form:"image" gorm:"type: varchar(255)"`
}

type UpdateProduct struct {
	Nameproduct string `json:"nameproduct" form:"nameproduct" gorm:"type : varchar(255)"`
	Price       int    `json:"price" form:"price" gorm:"type : int"`
	Image       string `json:"image" form:"image" gorm:"type: varchar(255)"`
}
