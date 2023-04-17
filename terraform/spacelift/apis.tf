locals {
  apis = [
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "cloudfunctions.googleapis.com",
    "run.googleapis.com",
    "eventarc.googleapis.com",
    "pubsub.googleapis.com"
  ]
}

resource "google_project_service" "project" {
  for_each = toset(local.apis)

  project = var.gcp_project_id
  service = each.value

  timeouts {
    create = "30m"
    update = "40m"
  }

  disable_dependent_services = true
}
