{{/*
Expand the name of the chart.
*/}}
{{- define "bands-api.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "bands-api.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "bands-api.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "bands-api.labels" -}}
helm.sh/chart: {{ include "bands-api.chart" . }}
{{ include "bands-api.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "bands-api.selectorLabels" -}}
app.kubernetes.io/name: {{ include "bands-api.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Smart environment-based defaults
*/}}
{{- define "bands-api.isLocal" -}}
{{- $nodeEnv := .Values.env.NODE_ENV | default "development" }}
{{- or (eq $nodeEnv "development") (eq $nodeEnv "local") }}
{{- end }}

{{/*
Determine if Vault should be enabled based on environment
*/}}
{{- define "bands-api.vaultEnabled" -}}
{{- $nodeEnv := .Values.env.NODE_ENV | default "development" }}
{{- if or (eq $nodeEnv "development") (eq $nodeEnv "local") }}
{{- false }}
{{- else }}
{{- true }}
{{- end }}
{{- end }}

{{/*
Determine if database is external based on environment
*/}}
{{- define "bands-api.databaseExternal" -}}
{{- $nodeEnv := .Values.env.NODE_ENV | default "development" }}
{{- if or (eq $nodeEnv "development") (eq $nodeEnv "local") }}
{{- false }}
{{- else }}
{{- true }}
{{- end }}
{{- end }}