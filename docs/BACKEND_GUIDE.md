# DevConnect — Full Backend Guide
## Laravel + Filament + PostgreSQL

> **Backend Stack**: Laravel 11 · Filament 3 · Laravel Sanctum · PostgreSQL  
> **Frontend**: React (Vite) on port 5174 connects to this API on port 8000

---

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Database & Environment](#2-database--environment)
3. [Models & Migrations](#3-models--migrations)
4. [Relationships](#4-relationships)
5. [Seeders & Factories](#5-seeders--factories)
6. [Filament Admin Panel](#6-filament-admin-panel)
7. [API Authentication (Sanctum)](#7-api-authentication-sanctum)
8. [API Controllers & Routes](#8-api-controllers--routes)
9. [CORS Configuration](#9-cors-configuration)
10. [Connecting Frontend to API](#10-connecting-frontend-to-api)
11. [Authorization (Policies)](#11-authorization-policies)
12. [File Uploads (Avatars, Images)](#12-file-uploads-avatars-images)
13. [Deployment Checklist](#13-deployment-checklist)

---

## 1. Project Setup

### Create the Laravel project (in a sibling folder to the frontend)

```bash
# Go up one level from find-developer/
cd /Users/macbookshop/Desktop

# Create Laravel project
composer create-project laravel/laravel devconnect-backend

cd devconnect-backend
```

### Install required packages

```bash
# Filament Admin Panel
composer require filament/filament:"^3.2" -W
php artisan filament:install --panels

# Laravel Sanctum (API token auth)
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Laravel Sluggable (auto-generate slugs)
composer require spatie/laravel-sluggable

# Image handling (optional but recommended)
composer require intervention/image:"^3.0"
```

### Run the dev server

```bash
php artisan serve          # Backend → http://localhost:8000
# In another terminal:
php artisan queue:work     # Process queued jobs (emails, etc.)
```

---

## 2. Database & Environment

### `.env` settings

```env
APP_NAME=DevConnect
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=devconnect
DB_USERNAME=postgres
DB_PASSWORD=your_password

SANCTUM_STATEFUL_DOMAINS=localhost:5174
SESSION_DOMAIN=localhost
FRONTEND_URL=http://localhost:5174

FILESYSTEM_DISK=public
```

### Create the MySQL database

```sql
CREATE DATABASE devconnect;
-- or via psql CLI:
-- psql -U postgres -c "CREATE DATABASE devconnect;"
```

---

## 3. Models & Migrations

Run all migrations after creating them:
```bash
php artisan migrate
# or start fresh:
php artisan migrate:fresh --seed
```

---

### 3.1 Users Table (already exists — extend it)

```bash
php artisan make:migration add_role_to_users_table
```

```php
// database/migrations/xxxx_add_role_to_users_table.php
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->enum('role', ['admin', 'user'])->default('user')->after('email');
    });
}
```

```php
// app/Models/User.php
use Laravel\Sanctum\HasApiTokens;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['name', 'email', 'password', 'role'];

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->role === 'admin';
    }
}
```

---

### 3.2 Skills Table

```bash
php artisan make:model Skill -m
```

```php
// Migration
Schema::create('skills', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('slug')->unique();
    $table->timestamps();
});
```

```php
// app/Models/Skill.php
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Skill extends Model
{
    use HasSlug;
    protected $fillable = ['name', 'slug'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('name')->saveSlugsTo('slug');
    }

    public function developers() { return $this->belongsToMany(Developer::class); }
}
```

---

### 3.3 Badges Table

```bash
php artisan make:model Badge -m
```

```php
// Migration
Schema::create('badges', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('slug')->unique();
    $table->text('description')->nullable();
    $table->string('icon')->nullable();      // lucide icon name or emoji
    $table->string('color')->nullable();     // hex or tailwind class
    $table->timestamps();
});
```

```php
// app/Models/Badge.php
class Badge extends Model
{
    use HasSlug;
    protected $fillable = ['name', 'slug', 'description', 'icon', 'color'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('name')->saveSlugsTo('slug');
    }

    public function developers() { return $this->belongsToMany(Developer::class); }
}
```

---

### 3.4 Developers Table

```bash
php artisan make:model Developer -m
```

```php
// Migration
Schema::create('developers', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('slug')->unique();
    $table->string('job_title');
    $table->text('bio')->nullable();
    $table->string('avatar')->nullable();           // storage path
    $table->unsignedTinyInteger('experience_years')->default(0);
    $table->string('location')->nullable();
    $table->string('email')->nullable();
    $table->string('phone')->nullable();
    $table->string('portfolio_url')->nullable();
    $table->string('github_url')->nullable();
    $table->string('linkedin_url')->nullable();
    $table->string('availability')->nullable();      // "Available" / "Busy"
    $table->string('availability_type')->nullable(); // "Freelance" / "Full-time" / "Remote"
    $table->boolean('is_recommended')->default(false);
    $table->decimal('expected_salary', 8, 2)->nullable();
    $table->boolean('is_active')->default(true);
    $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
    $table->timestamps();
});
```

```php
// app/Models/Developer.php
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Developer extends Model
{
    use HasSlug;

    protected $fillable = [
        'name', 'slug', 'job_title', 'bio', 'avatar',
        'experience_years', 'location', 'email', 'phone',
        'portfolio_url', 'github_url', 'linkedin_url',
        'availability', 'availability_type',
        'is_recommended', 'expected_salary', 'is_active', 'user_id',
    ];

    protected $casts = [
        'is_recommended' => 'boolean',
        'is_active' => 'boolean',
        'experience_years' => 'integer',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('name')->saveSlugsTo('slug');
    }

    public function skills()          { return $this->belongsToMany(Skill::class); }
    public function badges()          { return $this->belongsToMany(Badge::class); }
    public function recommendations() { return $this->hasMany(Recommendation::class); }
    public function user()            { return $this->belongsTo(User::class); }

    // Computed accessor for avatar URL
    public function getAvatarUrlAttribute(): ?string
    {
        return $this->avatar ? asset('storage/' . $this->avatar) : null;
    }
}
```

---

### 3.5 Pivot Tables (Skills & Badges)

```bash
php artisan make:migration create_developer_skill_table
php artisan make:migration create_developer_badge_table
```

```php
// developer_skill pivot
Schema::create('developer_skill', function (Blueprint $table) {
    $table->foreignId('developer_id')->constrained()->cascadeOnDelete();
    $table->foreignId('skill_id')->constrained()->cascadeOnDelete();
    $table->primary(['developer_id', 'skill_id']);
});

// developer_badge pivot
Schema::create('developer_badge', function (Blueprint $table) {
    $table->foreignId('developer_id')->constrained()->cascadeOnDelete();
    $table->foreignId('badge_id')->constrained()->cascadeOnDelete();
    $table->primary(['developer_id', 'badge_id']);
});
```

---

### 3.6 Recommendations Table

```bash
php artisan make:model Recommendation -m
```

```php
// Migration
Schema::create('recommendations', function (Blueprint $table) {
    $table->id();
    $table->foreignId('developer_id')->constrained()->cascadeOnDelete();
    $table->string('recommender_name');
    $table->string('recommender_title')->nullable();
    $table->text('quote');
    $table->timestamps();
});
```

```php
// app/Models/Recommendation.php
class Recommendation extends Model
{
    protected $fillable = ['developer_id', 'recommender_name', 'recommender_title', 'quote'];
    public function developer() { return $this->belongsTo(Developer::class); }
}
```

---

### 3.7 Blogs Table

```bash
php artisan make:model Blog -m
```

```php
// Migration
Schema::create('blogs', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug')->unique();
    $table->text('excerpt')->nullable();
    $table->longText('body');
    $table->string('featured_image')->nullable();
    $table->foreignId('author_id')->constrained('users')->cascadeOnDelete();
    $table->timestamp('published_at')->nullable();
    $table->boolean('is_published')->default(false);
    $table->timestamps();
});
```

```php
// app/Models/Blog.php
class Blog extends Model
{
    use HasSlug;
    protected $fillable = [
        'title', 'slug', 'excerpt', 'body',
        'featured_image', 'author_id', 'published_at', 'is_published'
    ];
    protected $casts = ['published_at' => 'datetime', 'is_published' => 'boolean'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('title')->saveSlugsTo('slug');
    }

    public function author() { return $this->belongsTo(User::class, 'author_id'); }

    public function scopePublished($query) { return $query->where('is_published', true); }
}
```

---

### 3.8 Hackathons Table

```bash
php artisan make:model Hackathon -m
```

```php
// Migration
Schema::create('hackathons', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug')->unique();
    $table->text('description')->nullable();
    $table->string('image')->nullable();
    $table->string('location')->nullable();
    $table->date('event_date')->nullable();
    $table->string('registration_url')->nullable();
    $table->enum('status', ['upcoming', 'ongoing', 'ended'])->default('upcoming');
    $table->timestamps();
});
```

```php
// app/Models/Hackathon.php
class Hackathon extends Model
{
    use HasSlug;
    protected $fillable = [
        'title', 'slug', 'description', 'image',
        'location', 'event_date', 'registration_url', 'status'
    ];
    protected $casts = ['event_date' => 'date'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('title')->saveSlugsTo('slug');
    }
}
```

---

## 4. Relationships Summary

```
User ──────────────── Developer (one-to-one via user_id)
Developer ─────────── Skill (many-to-many via developer_skill)
Developer ─────────── Badge (many-to-many via developer_badge)
Developer ─────────── Recommendation (one-to-many)
User (admin) ──────── Blog (one-to-many via author_id)
```

---

## 5. Seeders & Factories

```bash
php artisan make:seeder DatabaseSeeder
php artisan make:factory DeveloperFactory
```

```php
// database/seeders/DatabaseSeeder.php
public function run(): void
{
    // Create admin user
    User::create([
        'name' => 'Admin',
        'email' => 'admin@devconnect.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
    ]);

    // Create skills
    $skills = ['React', 'Laravel', 'Vue.js', 'Node.js', 'Python', 'Flutter',
               'TypeScript', 'Next.js', 'MySQL', 'PostgreSQL', 'Docker', 'AWS'];
    foreach ($skills as $skill) {
        Skill::create(['name' => $skill]);
    }

    // Create badges
    Badge::insert([
        ['name' => 'Soft Skills',          'slug' => 'soft-skills',          'icon' => '🎤', 'color' => '#3b82f6'],
        ['name' => 'Experience Validated', 'slug' => 'experience-validated', 'icon' => '🚀', 'color' => '#22c55e'],
        ['name' => 'Passion Developer',    'slug' => 'passion-developer',    'icon' => '🔋', 'color' => '#eab308'],
        ['name' => 'Platform Contributor', 'slug' => 'platform-contributor', 'icon' => '👥', 'color' => '#a855f7'],
        ['name' => 'Platform Marketer',    'slug' => 'platform-marketer',    'icon' => '📊', 'color' => '#ec4899'],
        ['name' => 'The Founder',          'slug' => 'the-founder',          'icon' => '⭐', 'color' => '#f97316'],
    ]);

    // Create sample developers
    Developer::factory(15)->create();
}
```

```php
// database/factories/DeveloperFactory.php
public function definition(): array
{
    return [
        'name' => $this->faker->name(),
        'job_title' => $this->faker->randomElement([
            'Full Stack Developer', 'Backend Developer', 'Frontend Developer',
            'Mobile Developer', 'DevOps Engineer', 'UI/UX Designer'
        ]),
        'bio' => $this->faker->paragraph(3),
        'experience_years' => $this->faker->numberBetween(1, 10),
        'location' => $this->faker->randomElement(['Baghdad', 'Basra', 'Erbil', 'Mosul']),
        'email' => $this->faker->safeEmail(),
        'availability' => $this->faker->randomElement(['Available', 'Busy']),
        'availability_type' => $this->faker->randomElement(['Freelance', 'Full-time', 'Remote']),
        'is_recommended' => $this->faker->boolean(30),
        'is_active' => true,
    ];
}
```

Run seeder:
```bash
php artisan migrate:fresh --seed
```

---

## 6. Filament Admin Panel

Access: `http://localhost:8000/admin`

### Create Resources

```bash
php artisan make:filament-resource Developer --generate
php artisan make:filament-resource Skill --generate
php artisan make:filament-resource Badge --generate
php artisan make:filament-resource Blog --generate
php artisan make:filament-resource Hackathon --generate
php artisan make:filament-resource Recommendation --generate
php artisan make:filament-resource User --generate
```

### Example — Developer Resource

```php
// app/Filament/Resources/DeveloperResource.php
use Filament\Forms;
use Filament\Tables;

class DeveloperResource extends Resource
{
    protected static ?string $model = Developer::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Basic Info')->schema([
                Forms\Components\TextInput::make('name')->required(),
                Forms\Components\TextInput::make('job_title')->required(),
                Forms\Components\Textarea::make('bio')->rows(4),
                Forms\Components\FileUpload::make('avatar')
                    ->image()->directory('avatars')->imageResizeWidth(400),
            ])->columns(2),

            Forms\Components\Section::make('Details')->schema([
                Forms\Components\TextInput::make('location'),
                Forms\Components\TextInput::make('email')->email(),
                Forms\Components\TextInput::make('phone'),
                Forms\Components\Select::make('experience_years')
                    ->options(array_combine(range(1, 15), range(1, 15))),
                Forms\Components\Select::make('availability')
                    ->options(['Available' => 'Available', 'Busy' => 'Busy']),
                Forms\Components\Select::make('availability_type')
                    ->options(['Freelance' => 'Freelance', 'Full-time' => 'Full-time', 'Remote' => 'Remote']),
                Forms\Components\Toggle::make('is_recommended')->label('Recommended'),
                Forms\Components\Toggle::make('is_active')->label('Active / Visible'),
            ])->columns(2),

            Forms\Components\Section::make('Links')->schema([
                Forms\Components\TextInput::make('portfolio_url')->url(),
                Forms\Components\TextInput::make('github_url')->url(),
                Forms\Components\TextInput::make('linkedin_url')->url(),
            ])->columns(3),

            Forms\Components\Section::make('Skills & Badges')->schema([
                Forms\Components\Select::make('skills')
                    ->relationship('skills', 'name')
                    ->multiple()->preload()->searchable(),
                Forms\Components\Select::make('badges')
                    ->relationship('badges', 'name')
                    ->multiple()->preload(),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('avatar')->circular(),
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('job_title')->searchable(),
                Tables\Columns\TextColumn::make('location'),
                Tables\Columns\TextColumn::make('availability')
                    ->badge()
                    ->color(fn($state) => $state === 'Available' ? 'success' : 'warning'),
                Tables\Columns\IconColumn::make('is_recommended')->boolean(),
                Tables\Columns\IconColumn::make('is_active')->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('availability_type')
                    ->options(['Freelance' => 'Freelance', 'Full-time' => 'Full-time', 'Remote' => 'Remote']),
                Tables\Filters\TernaryFilter::make('is_recommended'),
                Tables\Filters\TernaryFilter::make('is_active'),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([
                Tables\Actions\DeleteBulkAction::make(),
            ])]);
    }
}
```

### Filament Dashboard Widgets (Stats)

```bash
php artisan make:filament-widget StatsOverview --stats-overview
```

```php
// app/Filament/Widgets/StatsOverview.php
protected function getStats(): array
{
    return [
        Stat::make('Total Developers', Developer::count()),
        Stat::make('Recommended', Developer::where('is_recommended', true)->count()),
        Stat::make('Blog Posts', Blog::where('is_published', true)->count()),
        Stat::make('Hackathons', Hackathon::count()),
    ];
}
```

---

## 7. API Authentication (Sanctum)

### Register endpoint

```bash
php artisan make:controller Api/AuthController
```

```php
// app/Http/Controllers/Api/AuthController.php
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user  = auth()->user();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
```

---

## 8. API Controllers & Routes

### Developer Controller

```bash
php artisan make:controller Api/DeveloperController --api
```

```php
// app/Http/Controllers/Api/DeveloperController.php
class DeveloperController extends Controller
{
    public function index(Request $request)
    {
        $query = Developer::with(['skills', 'badges', 'recommendations'])
            ->where('is_active', true);

        // Search
        if ($search = $request->search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%")
                  ->orWhereHas('skills', fn($q) => $q->where('name', 'like', "%$search%"));
            });
        }

        // Filters
        if ($jobTitle = $request->job_title) {
            $query->where('job_title', $jobTitle);
        }
        if ($location = $request->location) {
            $query->where('location', $location);
        }
        if ($availability = $request->availability_type) {
            $query->where('availability_type', $availability);
        }
        if ($request->recommended) {
            $query->where('is_recommended', true);
        }
        if ($skills = $request->skills) {
            $skillList = is_array($skills) ? $skills : explode(',', $skills);
            $query->whereHas('skills', fn($q) => $q->whereIn('name', $skillList));
        }

        $developers = $query->orderByDesc('is_recommended')
                            ->paginate($request->per_page ?? 12);

        return response()->json($developers);
    }

    public function show(string $slug)
    {
        $developer = Developer::with(['skills', 'badges', 'recommendations'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json($developer);
    }
}
```

### Charts Controller

```bash
php artisan make:controller Api/ChartController
```

```php
// app/Http/Controllers/Api/ChartController.php
class ChartController extends Controller
{
    public function stats()
    {
        // Developers by job title
        $byJobTitle = Developer::where('is_active', true)
            ->selectRaw('job_title, COUNT(*) as count')
            ->groupBy('job_title')
            ->orderByDesc('count')
            ->get();

        // Developers by location
        $byLocation = Developer::where('is_active', true)
            ->selectRaw('location, COUNT(*) as count')
            ->groupBy('location')
            ->orderByDesc('count')
            ->get();

        // Developers by availability type
        $byAvailability = Developer::where('is_active', true)
            ->selectRaw('availability_type, COUNT(*) as count')
            ->groupBy('availability_type')
            ->get();

        // Top skills
        $topSkills = Skill::withCount('developers')
            ->orderByDesc('developers_count')
            ->limit(10)
            ->get();

        // Monthly registrations — PostgreSQL date functions
        $monthly = Developer::selectRaw(
                "EXTRACT(YEAR FROM created_at) as year, EXTRACT(MONTH FROM created_at) as month, COUNT(*) as count"
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupByRaw('EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at)')
            ->orderByRaw('year, month')
            ->get();

        return response()->json(compact('byJobTitle', 'byLocation', 'byAvailability', 'topSkills', 'monthly'));
    }
}
```

### API Routes

```php
// routes/api.php
use App\Http\Controllers\Api\{AuthController, DeveloperController, ChartController};
use App\Http\Controllers\Api\{BlogController, BadgeController, HackathonController};

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Developers (public read)
Route::get('/developers',          [DeveloperController::class, 'index']);
Route::get('/developers/{slug}',   [DeveloperController::class, 'show']);

// Blogs (public)
Route::get('/blogs',               [BlogController::class, 'index']);
Route::get('/blogs/{slug}',        [BlogController::class, 'show']);

// Badges (public)
Route::get('/badges',              [BadgeController::class, 'index']);

// Hackathons (public)
Route::get('/hackathons',          [HackathonController::class, 'index']);

// Charts / Stats (public)
Route::get('/charts/stats',        [ChartController::class, 'stats']);
Route::get('/filter-options',      [DeveloperController::class, 'filterOptions']);

// Protected routes (require token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',                         [AuthController::class, 'logout']);
    Route::get('/me',                              [AuthController::class, 'me']);
    Route::put('/developers/{slug}',               [DeveloperController::class, 'update']);
    Route::post('/recommendations',                [RecommendationController::class, 'store']);
});
```

### Filter Options endpoint (for dropdowns in frontend)

```php
// In DeveloperController
public function filterOptions()
{
    return response()->json([
        'jobTitles'         => Developer::where('is_active', true)
                                ->distinct()->pluck('job_title')->sort()->values(),
        'locations'         => Developer::where('is_active', true)
                                ->whereNotNull('location')->distinct()->pluck('location')->sort()->values(),
        'availabilityTypes' => Developer::where('is_active', true)
                                ->whereNotNull('availability_type')->distinct()->pluck('availability_type'),
        'skills'            => Skill::orderBy('name')->pluck('name'),
    ]);
}
```

---

## 9. CORS Configuration

```php
// config/cors.php
return [
    'paths'               => ['api/*'],
    'allowed_methods'     => ['*'],
    'allowed_origins'     => ['http://localhost:5174'],  // React dev server
    'allowed_headers'     => ['*'],
    'exposed_headers'     => [],
    'max_age'             => 0,
    'supports_credentials' => true,
];
```

---

## 10. Connecting Frontend to API

### Install in the React project

```bash
cd /Users/macbookshop/Desktop/find-developer
npm install axios @tanstack/react-query
```

### Setup (add to `main.jsx`)

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

// Attach token if stored
const token = localStorage.getItem('token');
if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const queryClient = new QueryClient();

// Wrap <App /> with:
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:8000
```

### Replace mock data — Home page example

```jsx
// pages/home/index.jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Fetch developers with filters
const { data, isLoading } = useQuery({
  queryKey: ['developers', filters],
  queryFn: () => axios.get('/api/developers', { params: filters }).then(r => r.data),
});

const developers = data?.data ?? [];       // paginated results
const total = data?.total ?? 0;
const lastPage = data?.last_page ?? 1;
```

### Auth Context update

```jsx
// context/AuthContext.jsx
const login = async (email, password) => {
  const { data } = await axios.post('/api/login', { email, password });
  localStorage.setItem('token', data.token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  setUser(data.user);
  setIsAuthenticated(true);
};

const logout = async () => {
  await axios.post('/api/logout');
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  setUser(null);
  setIsAuthenticated(false);
};
```

---

## 11. Authorization (Policies)

```bash
php artisan make:policy DeveloperPolicy --model=Developer
```

```php
// app/Policies/DeveloperPolicy.php
public function update(User $user, Developer $developer): bool
{
    // Admin can edit any, user can only edit their own
    return $user->role === 'admin' || $user->id === $developer->user_id;
}
```

Register in `AuthServiceProvider`:
```php
protected $policies = [
    Developer::class => DeveloperPolicy::class,
];
```

---

## 12. File Uploads (Avatars, Images)

```bash
php artisan storage:link   # Creates public/storage symlink
```

Filament handles uploads automatically via `FileUpload::make('avatar')->directory('avatars')`.

For API uploads (React → Laravel):
```php
// DeveloperController@update
if ($request->hasFile('avatar')) {
    $path = $request->file('avatar')->store('avatars', 'public');
    $developer->update(['avatar' => $path]);
}
```

Return avatar URL from the model:
```php
// In Developer resource JSON, include:
'avatar_url' => $this->avatar ? asset('storage/' . $this->avatar) : null,
```

---

## 13. Deployment Checklist

```bash
# 1. Set production .env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# 2. Optimize
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link

# 3. Run migrations
php artisan migrate --force

# 4. Build frontend
cd /path/to/find-developer
npm run build
# Deploy dist/ to your web server / CDN
```

---

## Quick Command Reference

```bash
# Backend
php artisan serve                          # Start server (port 8000)
php artisan migrate:fresh --seed           # Reset DB + seed data
php artisan make:model ModelName -m        # Model + migration
php artisan make:filament-resource Model   # Filament admin resource
php artisan make:controller Api/Name --api # API controller
php artisan tinker                         # REPL for testing

# Frontend
npm run dev                                # Start Vite (port 5174)
```
