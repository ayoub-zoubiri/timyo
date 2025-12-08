#  Timyo - Application de Réservation de Rendez-vous

Application web de réservation de rendez-vous avec authentification Laravel Sanctum (SPA Authentication) et gestion multi-rôles (Admin & User).

---

##  Technologies Utilisées

### Backend
- **Laravel 10** - Framework PHP
- **Laravel Sanctum** - Authentification SPA (cookie-based)
- **MySQL** - Base de données
- **PHPUnit** - Tests unitaires

### Frontend
- **React 18** - Framework JavaScript
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **Axios** - Client HTTP
- **React Router** - Navigation
- **Jest & React Testing Library** - Tests

---

##  Fonctionnalités

###  Utilisateur
- ✅ Inscription et connexion sécurisées
- ✅ Créer un rendez-vous (date et heure)
- ✅ Consulter ses rendez-vous
- ✅ Annuler un rendez-vous

###  Administrateur
- ✅ Voir tous les rendez-vous
- ✅ Approuver ou rejeter un rendez-vous
- ✅ Gérer les utilisateurs

---

##  Structure du Projet

```
timyo/
├── laravel/          # Backend API Laravel
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── tests/
├── react/            # Frontend React
│   ├── src/
│   └── tests/
└── README.md
```

---

##  Installation

### Prérequis
- PHP >= 8.1
- Composer
- Node.js >= 18
- MySQL

### Backend (Laravel)

```bash
# Accéder au dossier backend
cd laravel

# Installer les dépendances
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Configurer la base de données dans .env
# DB_DATABASE=timyo
# DB_USERNAME=root
# DB_PASSWORD=

# Exécuter les migrations et seeders
php artisan migrate --seed

# Lancer le serveur
php artisan serve
```

### Frontend (React)

```bash
# Accéder au dossier frontend
cd react

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

---

##  Comptes de Test

| Rôle  | Email              | Mot de passe |
|-------|-------------------|--------------|
| Admin | admin@timyo.com   | password     |
| User  | user@timyo.com    | password     |

---

##  API Endpoints

### Authentification
| Méthode | Endpoint           | Description         |
|---------|-------------------|---------------------|
| POST    | `/api/register`   | Inscription         |
| POST    | `/api/login`      | Connexion           |
| POST    | `/api/logout`     | Déconnexion         |

### Rendez-vous (User)
| Méthode | Endpoint                    | Description              |
|---------|-----------------------------|--------------------------|
| GET     | `/api/appointments`         | Liste mes rendez-vous    |
| POST    | `/api/appointments`         | Créer un rendez-vous     |
| DELETE  | `/api/appointments/{id}`    | Annuler un rendez-vous   |

### Administration
| Méthode | Endpoint                           | Description                |
|---------|------------------------------------|----------------------------|
| GET     | `/api/admin/appointments`          | Tous les rendez-vous       |
| PATCH   | `/api/admin/appointments/{id}`     | Modifier le statut         |
| GET     | `/api/admin/users`                 | Liste des utilisateurs     |

---

##  Tests

### Backend
```bash
cd laravel
php artisan test
```

### Frontend
```bash
cd react
npm test
```

---

##  Licence

Ce projet est développé dans le cadre d'un brief Simplon.

---

##  Auteur

**Ayoub Zoubiri** - Développeur Fullstack
