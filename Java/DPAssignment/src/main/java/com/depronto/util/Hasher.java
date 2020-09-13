/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.depronto.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author admin
 */
public class Hasher {

    Map<String, String> DB = new HashMap<String, String>();
    public static final String SALT = "dEpRonTO";

//    public static void main(String args[]) {
//        Hasher demo = new Hasher();
////        demo.signup("john", "dummy123");
//        if (demo.login("john", "dummy123")) {
//            System.out.println("user login successfull.");
//        }
//
//        // login should fail because of wrong password.
//        if (demo.login("john", "blahblah")) {
//            System.out.println("User login successfull.");
//        } else {
//            System.out.println("user login failed.");
//        }
//    }

    public static Object getInput(Connection con, String username, String password, String action) {

        if (action.equalsIgnoreCase("R")) {
            return signup(con, username, password);
        } else {
            return login(con, username, password);
        }

    }

    public static boolean signup(Connection con, String username, String password) {
        String saltedPassword = SALT + password;
        String hashedPassword = generateHash(saltedPassword);
        return DBUtil.create(con, username, hashedPassword);
    }

    public static Map<String, String> login(Connection con, String username, String password) {

        String saltedPassword = SALT + password;
        String hashedPassword = generateHash(saltedPassword);

        Map<String, String> validate = DBUtil.validate(con, username, hashedPassword);
        
        return validate;
    }

    public static String generateHash(String input) {
        StringBuilder hash = new StringBuilder();

        try {
            MessageDigest sha = MessageDigest.getInstance("SHA-1");
            byte[] hashedBytes = sha.digest(input.getBytes());
            char[] digits = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'a', 'b', 'c', 'd', 'e', 'f'};
            for (int idx = 0; idx < hashedBytes.length; ++idx) {
                byte b = hashedBytes[idx];
                hash.append(digits[(b & 0xf0) >> 4]);
                hash.append(digits[b & 0x0f]);
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return hash.toString();
    }

}
