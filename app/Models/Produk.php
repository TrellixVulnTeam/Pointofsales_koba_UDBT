<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class,'id_kategori','id');
    }

    public function satuan()
    {
        return $this->belongsTo(Satuan::class,'id_satuan','id');
    }
}
