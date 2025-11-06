package config

import (
	"os"

	"gopkg.in/yaml.v3"
)

// Source はRSSフィードのソース設定
type Source struct {
	Name    string `yaml:"name"`
	URL     string `yaml:"url"`
	Enabled bool   `yaml:"enabled"`
}

// Config はアプリケーション設定
type Config struct {
	Sources []Source `yaml:"sources"`
}

// LoadConfig は設定ファイルを読み込む
func LoadConfig(filepath string) (*Config, error) {
	data, err := os.ReadFile(filepath)
	if err != nil {
		return nil, err
	}

	var config Config
	if err := yaml.Unmarshal(data, &config); err != nil {
		return nil, err
	}

	return &config, nil
}

// GetEnabledSources は有効なソースのみを返す
func (c *Config) GetEnabledSources() []Source {
	var enabled []Source
	for _, source := range c.Sources {
		if source.Enabled {
			enabled = append(enabled, source)
		}
	}
	return enabled
}
