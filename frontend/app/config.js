angular.module("config", [])

.constant("version", "0.0.0")

.constant("config", {
	"appName": "AppName",
	"env": "development",
	"urlBackend": "http://localhost:8080/hansoftws/chart/list",
	"enableLegend": false
})

;