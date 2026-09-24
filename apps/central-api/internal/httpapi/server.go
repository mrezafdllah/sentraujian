package httpapi

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"time"
)

const APIVersion = "v1"

type Config struct {
	Address string
}

type Server struct {
	logger *slog.Logger
}

type statusResponse struct {
	Status    string `json:"status"`
	Service   string `json:"service"`
	Version   string `json:"version"`
	Timestamp string `json:"timestamp"`
}

func New(config Config, logger *slog.Logger) http.Handler {
	server := &Server{logger: logger}
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", server.health)
	mux.HandleFunc("GET /readiness", server.readiness)
	mux.HandleFunc("GET /api/v1/health", server.health)
	mux.HandleFunc("GET /api/v1/readiness", server.readiness)
	return requestLogger(logger, mux)
}

func (server *Server) health(writer http.ResponseWriter, request *http.Request) {
	writeJSON(writer, http.StatusOK, statusResponse{Status: "ok", Service: "central-api", Version: APIVersion, Timestamp: time.Now().UTC().Format(time.RFC3339)})
}

func (server *Server) readiness(writer http.ResponseWriter, request *http.Request) {
	writeJSON(writer, http.StatusOK, statusResponse{Status: "ready", Service: "central-api", Version: APIVersion, Timestamp: time.Now().UTC().Format(time.RFC3339)})
}

func writeJSON(writer http.ResponseWriter, status int, payload statusResponse) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(status)
	_ = json.NewEncoder(writer).Encode(payload)
}

func requestLogger(logger *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		started := time.Now()
		next.ServeHTTP(writer, request)
		logger.Info("http request", "method", request.Method, "path", request.URL.Path, "duration_ms", time.Since(started).Milliseconds())
	})
}
