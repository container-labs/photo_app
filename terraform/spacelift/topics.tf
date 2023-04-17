resource "google_pubsub_topic" "main" {
  name = "test-top"

  depends_on = [
    google_project_service.project["pubsub.googleapis.com"],
  ]
}
