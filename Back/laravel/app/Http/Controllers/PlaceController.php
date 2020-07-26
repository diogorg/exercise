<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use ParseCsv\Csv;
use App\Places;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PlacesExport;

class PlaceController extends Controller
{
    public function export()
    {
        return Excel::download(new PlacesExport, 'places.csv');
    }

    public function grid()
    {
        $places = Places::all();
        return response()->json($places->toArray(), 200);
    }

    public function import(Request $request)
    {
        $file = $request->file('file');
        if (!$file || !$file->isValid()) {
            $e = new \Exception('Invalid File', 422);
            throw $e;
        }
        $places = $this->getArrayPlaces($file);
        $entity = new Places();
        try {
            foreach ($places as $placeLine) {
                $entity->saveFromCsvLine($placeLine);
            }
        } catch (\Exception $e) {
            $e = new \Exception('Invalid CSV Format', 422);
            throw $e;
        }
        return $this->grid();
    }

    private function getArrayPlaces($file)
    {
        $csv = new Csv();
        $csv->delimiter = ";";
        $csv->parse($file);
        return $csv->data;
    }
}
