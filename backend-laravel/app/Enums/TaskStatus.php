<?php

namespace App\Enums;

use App\Constants\TaskConstants;

enum TaskStatus: int
{
    case DONE = TaskConstants::STATUS_DONE;
    case PENDING = TaskConstants::STATUS_PENDING;

    public static function fromString(string $status): self
    {
        return match (strtolower($status)) {
            'pending' => self::PENDING,
            'done' => self::DONE,
            default => throw new \InvalidArgumentException("Invalid status: $status"),
        };
    }
}