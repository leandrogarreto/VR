require 'httparty'
require 'faker'

Given('que eu realize uma consulta ao endpoint de produtos e estabelecimentos') do
  @response = HTTParty.get('https://portal.vr.com.br/api-web/comum/enumerations/VRPAT')
  @json_response = JSON.parse(@response.body)
  puts "Resposta da consulta: #{@json_response}"
end

Then('o JSON retornado deve conter a chave {string}') do |chave|
  expect(@json_response).to have_key(chave)
  puts "Chave '#{chave}' encontrada no JSON retornado."
end

Then('deve ser impresso aleatoriamente um tipo de estabelecimento') do
    tipos_estabelecimento = @json_response['typeOfEstablishment']
    tipo_aleatorio = tipos_estabelecimento.sample
    puts "Tipo de estabelecimento aleatório: #{tipo_aleatorio}"
  end
