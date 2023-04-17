# resource "google_eventarc_trigger" "primary" {
#   name     = "${var.name}-trigger"
#   location = var.gcp_region
#   project  = local.gcp_project_id

#   matching_criteria {
#     attribute = "type"
#     value     = "google.cloud.pubsub.topic.v1.messagePublished"
#   }
#   destination {
#     cloud_run_service {
#       service = google_cloud_run_service.default.name
#       region  = var.gcp_region
#     }
#   }
# }

# resource "google_cloud_run_service" "default" {
#   name     = "${var.name}-service"
#   location = var.gcp_region
#   project  = local.gcp_project_id

#   # metadata {
#   #     namespace = var.name
#   # }

#   template {
#     spec {
#       containers {
#         image = "gcr.io/cloudrun/hello"
#         ports {
#           container_port = 8080
#         }
#       }
#       container_concurrency = 50
#       timeout_seconds       = 100
#     }
#   }

#   traffic {
#     percent         = 100
#     latest_revision = true
#   }
# }
