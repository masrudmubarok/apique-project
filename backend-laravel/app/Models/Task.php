<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'status',
    ];

    
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        foreach ($filters as $filterName => $filterValue) {
            if ($filterName === 'title') {
                $query->where('title', 'like', '%' . $filterValue . '%');
            }

            if ($filterName === 'status') {
                $query->where('status', $filterValue);
            }
        }

        return $query;
    }
}