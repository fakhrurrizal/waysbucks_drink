package toppingdto

type CreateTopping struct {
	ID          int    `json:"id"`
	Nametopping string `json:"nametopping" gorm:"type: varchar(255)" validate:"required"`
	Price       int    `json:"price" gorm:"type: varchar(255)" validate:"required"`
	Image       string `json:"image" gorm:"type: varchar(255)"`
}

type UpdateTopping struct {
	ID          int    `json:"id"`
	Nametopping string `json:"nametopping" gorm:"type: varchar(255)"`
	Price       int    `json:"price" gorm:"type: int" `
	Image       string `json:"image" gorm:"type: varchar(255)"`
}
