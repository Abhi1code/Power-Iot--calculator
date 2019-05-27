$(document).ready(function() {
    $('#submit').click(function() {

        var false_function_call = 0;
        var true_function_call = 1;
        var numeric_error = 2;
        var multiple_argument_error = 3;
        var custom_power_cycle;
        var on_time = parseFloat($.trim($('#on_time').val()));
        var off_time = parseFloat($.trim($('#off_time').val()));
        var on_current = parseFloat($.trim($('#on_current').val()));
        var off_current = parseFloat($.trim($('#off_current').val()));
        var battery_power = parseFloat($.trim($('#battery_power').val()));
        var power_cycle = parseFloat($.trim($('#power_cycle').val()));
        var power_hour = parseFloat($.trim($('#power_hour').val()));
        var power_day = parseFloat($.trim($('#power_day').val()));

        // Calculate battery life in days 
        function calculate_days() {

            if ($.isNumeric(on_time) && $.isNumeric(off_time) && $.isNumeric(on_current) && $.isNumeric(off_current) && $.isNumeric(battery_power)) {
                var on_power = on_time * on_current;
                var off_power = off_time * off_current;
                var total_power = on_power + off_power;
                var total_time = on_time + off_time;
                var cycle = total_power / total_time;
                $("#power_cycle:text").val(cycle);
                $("#power_hour:text").val((battery_power / cycle));
                $("#power_day:text").val((battery_power / cycle) / 24);
                return true_function_call;
            } else {
                return false_function_call;
            }

        }

        function assign_value() {
            $("#power_cycle:text").val(custom_power_cycle);
            $("#power_hour:text").val((battery_power / custom_power_cycle));
            $("#power_day:text").val((battery_power / custom_power_cycle) / 24);
            return true_function_call;
        }

        function empty_check(battery_flag) {
            if (!$.isNumeric(on_time) && $.isNumeric(off_time) && $.isNumeric(on_current) && $.isNumeric(off_current)) {
                var new_on_time = ((off_current * off_time) - (custom_power_cycle * off_time)) / (custom_power_cycle - on_current);
                $("#on_time:text").val(new_on_time);
                if (battery_flag) { assign_value(); } else { return true_function_call; }

            } else {
                if ($.isNumeric(on_time) && !$.isNumeric(off_time) && $.isNumeric(on_current) && $.isNumeric(off_current)) {
                    var new_off_time = ((on_time * on_current) - (custom_power_cycle * on_time)) / (custom_power_cycle - off_current);
                    $("#off_time:text").val(new_off_time);
                    if (battery_flag) { assign_value(); } else { return true_function_call; }

                } else {
                    if ($.isNumeric(on_time) && $.isNumeric(off_time) && !$.isNumeric(on_current) && $.isNumeric(off_current)) {
                        var new_on_current = ((custom_power_cycle * on_time) + (custom_power_cycle * off_time) - (off_time * off_current)) / on_time;
                        $("#on_current:text").val(new_on_current);
                        console.log(new_on_current);
                        if (battery_flag) { assign_value(); } else { return true_function_call; }

                    } else {
                        if ($.isNumeric(on_time) && $.isNumeric(off_time) && $.isNumeric(on_current) && !$.isNumeric(off_current)) {
                            var new_off_current = ((custom_power_cycle * on_time) + (custom_power_cycle * off_time) - (on_time * on_current)) / off_time;
                            $("#off_current:text").val(new_off_current);
                            if (battery_flag) { assign_value(); } else { return true_function_call; }

                        } else {
                            return multiple_argument_error;
                        }
                    }
                }
            }
        }

        // Reverse calculation when days or hours is given
        function calculate_reverse() {

            if ($.isNumeric(power_cycle) && !$.isNumeric(power_hour) && !$.isNumeric(power_day) && $.isNumeric(battery_power)) {

                custom_power_cycle = power_cycle;
                empty_check(true);
            } else {
                if (!$.isNumeric(power_cycle) && $.isNumeric(power_hour) && !$.isNumeric(power_day) && $.isNumeric(battery_power)) {

                    custom_power_cycle = battery_power / power_hour;
                    empty_check(true);
                } else {
                    if (!$.isNumeric(power_cycle) && !$.isNumeric(power_hour) && $.isNumeric(power_day) && $.isNumeric(battery_power)) {

                        custom_power_cycle = battery_power / (power_day * 24);
                        empty_check(true);
                    } else {
                        if ($.isNumeric(power_cycle) && !$.isNumeric(power_hour) && !$.isNumeric(power_day) && !$.isNumeric(battery_power)) {

                            custom_power_cycle = power_cycle;
                            empty_check(false);
                        } else {
                            if (!$.isNumeric(power_cycle) && $.isNumeric(power_hour) && !$.isNumeric(power_day) && !$.isNumeric(battery_power)) {

                                return multiple_argument_error;
                            } else {
                                if (!$.isNumeric(power_cycle) && !$.isNumeric(power_hour) && $.isNumeric(power_day) && !$.isNumeric(battery_power)) {
                                    // No case Possible
                                    return multiple_argument_error;
                                } else {
                                    if ($.isNumeric(power_cycle) && $.isNumeric(battery_power)) {
                                        // No case Possible
                                        custom_power_cycle = power_cycle;
                                        empty_check(true);
                                    } else {
                                        if ($.isNumeric(power_cycle) && !$.isNumeric(battery_power)) {

                                            custom_power_cycle = power_cycle;
                                            empty_check(false);
                                        } else {

                                            return multiple_argument_error;
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }

        function controller() {
            if (calculate_days() == false_function_call) {
                if (calculate_reverse() == multiple_argument_error) {
                    alert("Invalid Arguments : ERR CODE " + multiple_argument_error);
                }
            }
        }

        controller();

    });
});