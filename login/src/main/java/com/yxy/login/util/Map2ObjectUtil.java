package com.yxy.login.util;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Map;

public class Map2ObjectUtil {

    public static Object mapToObject(Map<String, Object> map, Class<?> beanClass) throws Exception {
        if (map == null){
            return null;
        }
        //获取所有列
        Object obj = beanClass.newInstance();
        Field[] fields = obj.getClass().getDeclaredFields();
        //给列赋值
        for (Field field : fields) {
            int mod = field.getModifiers();
            if (Modifier.isStatic(mod) || Modifier.isFinal(mod)) {
                continue;
            }
            field.setAccessible(true);
            if (map.containsKey(field.getName())) {
                field.set(obj, map.get(field.getName()));
            }
        }
        return obj;
    }

}
