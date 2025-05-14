FROM nginx:alpine

# Copier les fichiers buildés
COPY dist/ /usr/share/nginx/html/

# Exposer le port standard HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]