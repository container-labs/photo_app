resource "google_pubsub_topic" "main" {
  name = "test-topic"

  depends_on = [
    google_project_service.project["pubsub.googleapis.com"],
  ]
}
