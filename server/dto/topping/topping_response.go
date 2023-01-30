package toppingdto

type ToppingResponse struct {
	ID          int    `json:"id"`
	Nametopping string `json:"nametopping" gorm:"type: varchar(255)"`
	Price       int    `json:"price" gorm:"type: int" `
	Image       string `json:"image" gorm:"type: varchar(255)"`
}
