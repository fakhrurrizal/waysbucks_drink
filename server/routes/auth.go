package routes

import (
	"waysbuckss/handlers"
	"waysbuckss/pkg/middleware"
	"waysbuckss/pkg/mysql"
	"waysbuckss/repositories"

	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerAuth(userRepository)

	r.HandleFunc("/register", middleware.UploadFile(h.Register)).Methods("POST")
	r.HandleFunc("/login", h.Login).Methods("POST")
	r.HandleFunc("/check-auth", middleware.Auth(h.CheckAuth)).Methods("GET")
}
