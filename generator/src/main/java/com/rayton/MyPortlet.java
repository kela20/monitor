package com.rayton;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class MyPortlet {

    public static void main(String[] args) {


    }

    public static String shit() {

        String string = null;

        if (string != null) {
            String id = string.toUpperCase();
            if (id == null)
                id = "";
            List<String> vos = Arrays.asList(new String(id));
            if (vos != null) {
                for (String v : vos) {
                    if (v != null) {
                        return v;
                    }
                    continue;
                }
                return new String();
            } else
                return new String();
        } else
            return new String();


    }


    public static String shit2() {

        String string = null;


        return Optional.ofNullable(string).map(v -> {
            List<String> vos = Arrays.asList(new String(Optional.ofNullable(v.toUpperCase()).orElse("")));


            v = Optional.ofNullable(vos).orElse(new ArrayList<String>()).stream().filter(vo -> vo != null).findFirst
                    ().orElse(new String());
            return v;
        }).orElse(new String());
    }
}