<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Places extends Model
{
    protected $fillable = [
        'street',
        'district',
        'city',
        'address_complement',
        'number',
        'email',
        'name',
        'zip',
        'cpf',
        'birth'
    ];

    public function saveFromCsvLine($placeLine)
    {
        $address = $this->parseAddress($placeLine['endereco']);
        $birth = new Carbon($placeLine['datanasc']);
        $data = array_merge($address, [
            'email' => $placeLine['email'],
            'name' => $placeLine['nome'],
            'zip' => str_replace('-', '', $placeLine['cep']),
            'cpf' => str_replace(['-', '.'], '', $placeLine['cpf']),
            'birth' => $birth->toDateString()
        ]);
        self::create($data);
    }

    private function parseAddress(String $addressLine): array
    {
        $addressArray = preg_split("/(,|-)+/", $addressLine, 0, PREG_SPLIT_OFFSET_CAPTURE);
        $numberAndComplement = explode(' ', trim($addressArray[1][0]), 2);
        return [
            'street' => trim($addressArray[0][0]),
            'district' => trim($addressArray[2][0]),
            'number' => trim($numberAndComplement[0]),
            'address_complement' => trim($numberAndComplement[1]),
            'city' => trim($addressArray[3][0])
        ];
    }
}
