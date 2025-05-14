FROM nginx:alpine   

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés
COPY dist/ /usr/share/nginx/html/

# Exposer le port standard HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]