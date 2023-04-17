terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.0"
    }
  }
}

locals {
  # gcp_project_id = var.gcp_authentication.data.project_id
}

provider "google" {
  project     = var.gcp_project_id
  # credentials = jsonencode(var.gcp_authentication.data)
  region      = var.gcp_region
}

provider "google-beta" {
  project     = var.gcp_project_id
  # credentials = jsonencode(var.gcp_authentication.data)
  region      = var.gcp_region
}
