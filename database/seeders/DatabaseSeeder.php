<?php

namespace Database\Seeders;

use App\Models\Step;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $steps = [
            [
                'step'=>1,
                'name'=>'Create Business Requirements Document'
            ],
            [
                'step'=>2,
                'name'=>'Notify System Tester to create TRD'
            ],
            [
                'step'=>3,
                'name'=>'Create Technical Requirements Document'
            ],
            [
                'step'=>4,
                'name'=>'Notify Setup Committtee that TRD is done and setup can be scheduled'
            ],
            [
                'step'=>5,
                'name'=>'Input setup schedule, select attendees'
            ],
            [
                'step'=>6,
                'name'=>'Send an email of the schedule'
            ],
            [
                'step'=>7,
                'name'=>'Create Test Plan'
            ],
            [
                'step'=>8,
                'name'=>'Send an email of the Test Plan'
            ],
            [
                'step'=>9,
                'name'=>'Input schedule'
            ],
            [
                'step'=>9,
                'name'=>'Send an email on the schedule'
            ],
            [
                'step'=>10,
                'name'=>'Send an email to inform of failed test'
            ],
            [
                'step'=>11,
                'name'=>'Send an email to inform of completed test'
            ],
            [
                'step'=>12,
                'name'=>'Create Requirement Traceability Matrix based on Test Cases from TRD'
            ],
            [
                'step'=>13,
                'name'=>'Send an email to Software manager informing all test cases are passed'
            ],
        ];

        Step::insert($steps);
    }
}
