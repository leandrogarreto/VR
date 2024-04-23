# Arquivo support/env.rb

# Carregar os arquivos de passos
Dir.glob(File.join(File.dirname(__FILE__), '../features/step_definitions/**/*.rb')).sort.each { |file| require file }
require 'rspec/expectations'