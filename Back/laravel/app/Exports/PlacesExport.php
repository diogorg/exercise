<?php

namespace App\Exports;

use App\Places;
use Maatwebsite\Excel\Concerns\FromCollection;

class PlacesExport implements FromCollection
{
  public function collection()
  {
    return Places::all();
  }
}
