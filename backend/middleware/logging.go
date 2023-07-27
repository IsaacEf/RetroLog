package middleware

import (
	"bytes"
	"io/ioutil"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func LoggingMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// Form Data
		content_type := ctx.ContentType()

		if content_type == "application/json" {

			ByteBody, _ := ioutil.ReadAll(ctx.Request.Body)
			log.Printf("[API REQUEST] Data: %s", string(ByteBody))
			ctx.Request.Body = ioutil.NopCloser(bytes.NewBuffer(ByteBody))
		}

		ctx.Next()
	}
}
