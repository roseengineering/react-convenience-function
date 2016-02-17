
PRESETS="es2015,stage-0,react"

serve: index.js
	(sleep 2; xdg-open http://localhost:8000/) &
	python -m CGIHTTPServer

%.js: %.es
	babel --presets ${PRESETS} $< -o $@ 


