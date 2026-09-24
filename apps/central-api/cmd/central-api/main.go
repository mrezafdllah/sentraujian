package main

import (
	"log/slog"
	"net/http"
	"os"

	"github.com/mrezafdllah/sentraujian/apps/central-api/internal/config"
	"github.com/mrezafdllah/sentraujian/apps/central-api/internal/httpapi"
)

func main() {
	config := config.Load()
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	server := httpapi.New(httpapi.Config{Address: config.Address}, logger)

	logger.Info("central api starting", "address", config.Address, "api_version", httpapi.APIVersion)
	if err := http.ListenAndServe(config.Address, server); err != nil {
		logger.Error("central api stopped", "error", err)
		os.Exit(1)
	}
}
