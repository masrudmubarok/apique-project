<?php

namespace App\Constants;

class TaskConstants
{
    const STATUS_DONE = 1;
    const STATUS_PENDING = 0;

    public static function getStatus()
    {
        return [
            self::STATUS_PENDING,
            self::STATUS_DONE
        ];
    }

    public static function getStatusLable()
    {
        return [
            self::STATUS_DONE => 'done',
            self::STATUS_PENDING => 'pending',
        ];
    }
}