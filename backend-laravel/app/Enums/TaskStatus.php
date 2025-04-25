<?php

namespace App\Enums;

use App\Constants\TaskConstants;

enum TaskStatus: int
{
    case DONE = TaskConstants::STATUS_DONE;
    case PENDING = TaskConstants::STATUS_PENDING;
}