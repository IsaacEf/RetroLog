package storage

import (
	"fmt"
	"io"
	"os"

	"github.com/supabase-community/storage-go"
)

var Storage *storage_go.Client

var BUCKET = os.Getenv("BUCKET")

func Connect() {
	var err error
	host := os.Getenv("STORAGE_URL")
	service_token := os.Getenv("SERVICE_TOKEN")

	Storage = storage_go.NewClient(host, service_token, nil)

	if err != nil {
		panic(err)
	} else {
		fmt.Println("Successfully connected to Storage")
	}
}

// Uploads the file and returns the download url
func UploadBackwork(name string, file io.Reader) string {
	Storage.UploadFile(BUCKET, name, file)
	return Storage.GetPublicUrl(BUCKET, name).SignedURL
}
